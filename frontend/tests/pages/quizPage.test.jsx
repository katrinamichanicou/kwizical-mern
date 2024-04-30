import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { QuizPage } from "../../src/pages/Quiz/QuizPage";
import { describe, vi } from "vitest";
import "@testing-library/jest-dom";

const navigateMock = vi.fn();
vi.mock("react-router-dom", () => {
  const useNavigateMock = () => navigateMock;
  return { useNavigate: useNavigateMock };
});


beforeAll(() => {
  vi.mock("../../helpers/answer_generator", () => {
    const mockArtistAnswers = vi.fn();
    mockArtistAnswers.mockResolvedValue({
      selectedTrack: { artist: "correct-answer", preview: "examplePreviewUrl" },
      shuffledArtistAnswerList: [
        "Artist 1",
        "Artist 2",
        "Artist 3",
        "correct-answer",
      ],
    });
    return {
      artistAnswers: () => mockArtistAnswers(),
    };
  });
});

describe("Audio button component", () => {
  test("Play button is accessible on the page", () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    const playButton = screen.getByRole("button");
    expect(playButton.textContent).toBe("▶");
  });

  test("Pause button is accessible on the page", () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    expect(playButton.textContent).toBe("❚❚");
  });

  test("AudioButton changes state to play when clicked", () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    fireEvent.click(playButton);
    expect(playButton.textContent).toBe("▶");
  });

  test("Audio playback starts when play button is clicked", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    await waitFor(() => expect(screen.getByText("❚❚")).toBeInTheDocument());
  });

  test("Audio playback stops when play button is clicked", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    const playButton = screen.getByRole("button");
    fireEvent.click(playButton);
    fireEvent.click(playButton);
    await waitFor(() => expect(screen.getByText("▶")).toBeInTheDocument());
  });
});

describe("Question component", () => {
  test("Question displays on page", () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    expect(screen.getByText("What is the name of the artist?")).toBeTruthy();
  });
});

describe("Answer component", () => {
  test("All answers are shown on the page", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    await waitFor(() => screen.getByText("Artist 1"));
    expect(screen.getByText("Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Artist 2")).toBeInTheDocument();
    expect(screen.getByText("Artist 3")).toBeInTheDocument();
    expect(screen.getByText("correct-answer")).toBeInTheDocument();
  });

  test("Button changes to green when correct answer is clicked on the page", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    await waitFor(() => screen.getByText("Artist 1"));
    fireEvent.click(screen.getByText("correct-answer"));
    expect(screen.getByText("correct-answer")).toHaveClass("bg-correct-color");
  });

  test("Button changes to red when incorrect answer is clicked on the page", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    await waitFor(() => screen.getByText("Artist 1"));
    fireEvent.click(screen.getByText("Artist 2"));
    expect(screen.getByText("Artist 2")).toHaveClass("bg-incorrect-color");
  });

  test("After selecting an answer, another question is generated on the page", async () => {
    const navigateMock = vi.fn();
    vi.mock("react-router-dom", () => {
      const useNavigateMock = () => navigateMock;
      return { useNavigate: useNavigateMock };
    });

    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    await waitFor(() => screen.getByText("Question 1 of 5"));
    fireEvent.click(screen.getByText("correct-answer"));
    await waitFor(() => screen.getByText("Question 2 of 5"));
    fireEvent.click(screen.getByText("Artist 1"));
    await waitFor(() => screen.getByText("Question 3 of 5"));
    fireEvent.click(screen.getByText("Artist 2"));
    await waitFor(() => screen.getByText("Question 4 of 5"));
    fireEvent.click(screen.getByText("Artist 3"));
    await waitFor(() => screen.getByText("Question 5 of 5"));
    fireEvent.click(screen.getByText("correct-answer"));
    expect(navigateMock).toHaveBeenCalledWith("/score");
  });

  test("Page transitions from genre selection to quiz page correctly", async () => {
    render(<QuizPage />);
    expect(screen.getByText("Metal")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Pop"));
    await waitFor(() =>
      expect(screen.getByText("Your Results")).toBeInTheDocument()
    );
  });
});

describe("Timer component", () => {
  test("If answered immediately, bonus points are awarded", async () => {
    render(<QuizPage />);
    fireEvent.click(screen.getByText("Pop"));
    await waitFor(() => screen.getByText("Artist 1")); 
  
    fireEvent.click(screen.getByText("correct-answer"));
    expect(screen.getByText("Speed Bonus: 50")).toBeInTheDocument();
  }); 

 
  
});

