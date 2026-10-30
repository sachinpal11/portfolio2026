export type Work = {
  title: string;
  /** Screenshot path in /public; leave empty to show the placeholder. Shown at 16:9. */
  image?: string;
};

/** Two columns of project cards (on mobile they stack: column 1, then column 2). */
export const workColumns: [Work[], Work[]] = [
  [
    { title: "Tagflow", image: "/work/tagflow.jpeg" },
    { title: "Workyn", image: "/work/workyn.png" },
  ],
  [
    { title: "H2O", image: "/work/h2o.png" },
    { title: "United Hormones", image: "/work/unitedhormones.png" },
  ],
];
