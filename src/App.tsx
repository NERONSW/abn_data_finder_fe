import { useState } from "react";

import TableLayout from "./pages/TableLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <TableLayout />
      </div>
    </>
  );
}

export default App;
