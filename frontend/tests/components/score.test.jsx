import { render, screen } from "@testing-library/react";
import Score from "../../src/components/Score/Score";

describe("Score", () => {
    test('Score component displays correctly', () => {
        render(<Score/>);
        const heading = screen.getByRole("heading")
        expect(heading.textContent).toContain("Results");
    })
       
    })
