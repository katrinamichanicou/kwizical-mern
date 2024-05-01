import { vi } from "vitest";
import { randomTrack } from "../../helpers/track_generator.js";


// Mocking the getArtists service
vi.mock("../../src/services/deezerService", () => {
    const getTrackMock = vi.fn();
    getTrackMock.mockResolvedValue([
        { id: 45, title: "Title 45", artist: {name: "Artist 1"}, album: { title: "Album 1"}, preview: "Track Preview" },
        { id: 2, title: "Title 2", artist: "Artist 2", album: { title: "Album 2"}, preview: "Track Preview 2" },
        { id: 3, title: "Title 3", artist: "Artist 3", album: { title: "Album 3"}, preview: "Track Preview 3" },
    ]);
return {
    getTopTracksForArtist: getTrackMock,
    };
});
vi.mock("../../helpers/shuffle", () => ({
  shuffle: vi.fn(array => array), // Mock shuffle to return the original array (no shuffling)
}));
describe("Track Generator", () => {
    beforeEach(() => {
    });
    test('Returns first track from shuffled list', async () => {
        const { selectedTrack }= await randomTrack();
        const expectedTrack =
            { id: 45, title: "Title 45", artist: "Artist 1", album: "Album 1" , preview: "Track Preview"  };
        expect(selectedTrack).toEqual(expectedTrack);
    });
});
