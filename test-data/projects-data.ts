import { Project } from "@/types/Project.types";

const projects: Project[] = [
  {
    id: 1,
    icon: "GraduationCap",
    name: "School",
    color: "blue",
    tasks: [
      {
        id: 1,
        name: "Plan a table football tournament",
        due: new Date(),
        done: false,
      },
      {
        id: 2,
        name: "Make your own play mud",
        due: new Date(),
        done: false,
      },
      {
        id: 3,
        name: "Host a tea party for your family",
        due: new Date(),
        done: true,
      },
    ],
    members: [],
  },
  {
    id: 2,
    icon: "Bag",
    name: "Work",
    color: "brown",
    tasks: [
      {
        id: 1,
        name: "Make a origami swan",
        due: new Date(),
        done: false,
      },
      {
        id: 2,
        name: "Make a castle from a duvet",
        due: new Date(),
        done: false,
      },
      {
        id: 3,
        name: "Host a talent show for your family",
        due: new Date(),
        done: true,
      },
    ],
    members: [],
  },
];

export default projects;
