import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "./Register";
import { BrowserRouter } from "react-router-dom";

// Mock image agar backgroundImage tidak error
jest.mock("../../assets/img/backround.png", () => "mock-image");

// Mock navigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Mock fetch
global.fetch = jest.fn();

const renderForm = () =>
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>
  );

const isiFormRegistrasi = () => {
  fireEvent.change(screen.getByLabelText(/UserID/i), {
    target: { value: "12345" },
  });
  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: "Robo" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "robo@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "123456" },
  });
  fireEvent.change(screen.getByLabelText(/Kontak/i), {
    target: { value: "08123456789" },
  });
  fireEvent.change(screen.getByLabelText(/Tempat Tanggal lahir/i), {
    target: { value: "Jakarta, 1 Januari 2000" },
  });
};
beforeAll(() => {
  // Mock global alert untuk semua test
  window.alert = jest.fn();
});

describe("RegistrationForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("user dapat mengisi form dan submit dengan sukses", async () => {
    // Simulasi fetch register sukses
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: {
        get: () => "application/json", // <== WAJIB! untuk lulus pengecekan content-type
      },
      json: async () => ({ message: "User registered successfully" }),
    });

    renderForm();
    isiFormRegistrasi();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/signin");
    });

    // ✅ Cleanup: Hapus user dari database via fetch (jika ada API endpoint delete)
    await fetch(`http://localhost:3001/api/user/12345`, {
      method: "DELETE",
    });
  });

  test("menampilkan alert jika register gagal", async () => {
    fetch.mockRejectedValueOnce(new Error("Internal Server Error"));
    window.alert = jest.fn();

    renderForm();
    isiFormRegistrasi();
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("Registration failed")
    );
  });
});
