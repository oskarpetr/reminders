import { Project } from "@/types/Project.types";

const projects: Project[] = [
  {
    id: 1,
    icon: "GraduationCap",
    name: "School",
    color: "blue",
    tasks: [
      {
        taskId: 1,
        name: "Plan a table football tournament",
        due: new Date(),
        done: false,
      },
      {
        taskId: 2,
        name: "Make your own play mud",
        due: new Date(),
        done: false,
      },
      {
        taskId: 3,
        name: "Host a tea party for your family",
        due: new Date(),
        done: true,
      },
    ],
    users: [1, 1],
  },
  {
    id: 2,
    icon: "Bag",
    name: "Work",
    color: "brown",
    tasks: [
      {
        taskId: 1,
        name: "Make a origami swan",
        due: new Date(),
        done: false,
      },
      {
        taskId: 2,
        name: "Make a castle from a duvet",
        due: new Date(),
        done: false,
      },
      {
        taskId: 3,
        name: "Host a talent show for your family",
        due: new Date(),
        done: true,
      },
    ],
    users: [1],
  },
];

export default projects;
