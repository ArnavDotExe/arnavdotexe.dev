export interface PhotoSlot {
  src: string;
  alt: string;
}

// Placeholder images — swap the files in public/photography/ for real photos
// whenever they're ready. Every tile links out to the Instagram profile
// itself rather than a specific post, so nothing here needs to reference
// individual post URLs.
export const photoSlots: PhotoSlot[] = [
  { src: "/photography/photo-1.svg", alt: "Photograph by Arnav Mangaonkar — 1" },
  { src: "/photography/photo-2.svg", alt: "Photograph by Arnav Mangaonkar — 2" },
  { src: "/photography/photo-3.svg", alt: "Photograph by Arnav Mangaonkar — 3" },
  { src: "/photography/photo-4.svg", alt: "Photograph by Arnav Mangaonkar — 4" },
];
