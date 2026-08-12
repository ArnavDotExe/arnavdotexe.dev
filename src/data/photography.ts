export interface PhotoSlot {
  src: string;
  alt: string;
  caption?: string;
}

// To add a photo: drop the image file in public/photography/, then add one
// entry here. `caption` is optional — shows up handwritten-style on the
// polaroid. Rotation and layout are automatic, nothing else to touch.
export const photoSlots: PhotoSlot[] = [
  { src: "/photography/photo1.jpg", alt: "Photograph by Arnav Mangaonkar — 1", caption: "Dashavtar" },
  { src: "/photography/photo2.jpg", alt: "Photograph by Arnav Mangaonkar — 2", caption: "Dashavtar prelude" },
  { src: "/photography/photo3.jpg", alt: "Photograph by Arnav Mangaonkar — 3", caption: "goat" },
  { src: "/photography/photo4.jpg", alt: "Photograph by Arnav Mangaonkar — 4", caption: "walk n shoot" },
  { src: "/photography/photo5.jpg", alt: "Photograph by Arnav Mangaonkar — 5", caption: "city lights" },
  { src: "/photography/photo6.jpg", alt: "Photograph by Arnav Mangaonkar — 6", caption: "Murudeshwar" },
  { src: "/photography/photo7.jpg", alt: "Photograph by Arnav Mangaonkar — 7", caption: "Gokarna" },
  { src: "/photography/photo8.jpg", alt: "Photograph by Arnav Mangaonkar — 8", caption: "Bappa" },
  { src: "/photography/photo9.jpg", alt: "Photograph by Arnav Mangaonkar — 9", caption: "Burning Devotion" },
  { src: "/photography/photo10.jpg", alt: "Photograph by Arnav Mangaonkar — 10", caption: "Story on 2 wheels" },
];
