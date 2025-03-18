import Blog from "./Blog";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("renders title and author, but not url and likes", async () => {
  const blog = {
    title: "Test title",
    author: "Test author",
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} like={mockHandler} />);

  expect(screen.getByTestId("blog")).toBeDefined();
  expect(screen.getByText("Test title Test author")).toBeDefined();
  expect(screen.queryByText("likes")).toBeNull();
  expect(screen.queryByText("url")).toBeNull();
});

test("renders url and likes when show button is clicked", async () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "url.com",
    likes: 0,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} like={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByTestId("details-button");
  await user.click(button);

  expect(screen.getByText("url.com")).toBeDefined();
  expect(screen.getByText("0 likes")).toBeDefined();
});

test("renders url and likes when show button is clicked", async () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "url.com",
    likes: 0,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} like={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByTestId("details-button");
  await user.click(button);

  expect(screen.getByText("url.com")).toBeDefined();
  expect(screen.getByText("0 likes")).toBeDefined();
});

test("like button is clicked twice", async () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "url.com",
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} />);

  const user = userEvent.setup();

  const detailsButton = screen.getByTestId("details-button");
  await user.click(detailsButton);

  const likesButton = screen.getByTestId("like-button");
  await user.click(likesButton);
  await user.click(likesButton);

  expect(mockHandler.mock.calls).toHaveLength(3);
});
