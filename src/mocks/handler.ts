import { HttpResponse, http } from "msw";

export const handler = [
  http.get("https://jsonplaceholder.typicode.com/users/1", async () => {
    return HttpResponse.json({ email: "kamu@gmail.com" }, { status: 200 });
  }),
];
