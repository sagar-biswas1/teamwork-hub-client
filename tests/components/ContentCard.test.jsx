import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import ContentCard from "../../src/components/ContentCard";
import { AuthContext } from "../../src/context/AuthContext";
import { describe, it, expect, vi } from 'vitest';
const mockContent = {
  _id: "1",
  title: "Sample Content",
  collaborators: ["user1", "user2"],
  createdBy: { _id: "123", name: "Creator" },
  updatedAt: "2023-07-01",
};

const mockAuthUser = { _id: "123", name: "Creator" };
const mockHandleDelete = vi.fn();

describe("ContentCard", () => {
  test("renders ContentCard with title and collaborators", () => {
    render(
      <AuthContext.Provider value={{ authUser: mockAuthUser }}>
        <MemoryRouter>
          <ContentCard content={mockContent} handleDelete={mockHandleDelete} />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Sample Content")).toBeInTheDocument();
    expect(screen.getByText("2 collaborators")).toBeInTheDocument();
    expect(screen.getByText("Collaborate")).toBeInTheDocument();
  });

  test("shows delete button if authUser is the creator", () => {
    render(
      <AuthContext.Provider value={{ authUser: mockAuthUser }}>
        <MemoryRouter>
          <ContentCard content={mockContent} handleDelete={mockHandleDelete} />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("does not show delete button if authUser is not the creator", () => {
    const anotherUser = { _id: "456", name: "Another User" };
    
    render(
      <AuthContext.Provider value={{ authUser: anotherUser }}>
        <MemoryRouter>
          <ContentCard content={mockContent} handleDelete={mockHandleDelete} />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.queryByText("Delete")).toBeNull();
  });

  test("calls handleDelete when delete button is clicked", () => {
    render(
      <AuthContext.Provider value={{ authUser: mockAuthUser }}>
        <MemoryRouter>
          <ContentCard content={mockContent} handleDelete={mockHandleDelete} />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockHandleDelete).toHaveBeenCalledWith("1");
  });
});
