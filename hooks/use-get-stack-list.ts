import { useEffect, useState } from "react";

export default function useGetStackList() {
  const [techs, setTechs] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/icons")
      .then((res) => res.json())
      .then((data) => {
        setTechs(data);
      });
  }, []);

  return techs;
}
