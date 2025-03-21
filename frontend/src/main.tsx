import { FC, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./hooks/useAuth";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // This will be set after we wrap the app in AuthContextProvider
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const InnerApp: FC = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </StrictMode>
  );
}
