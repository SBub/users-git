import { useEffect, useRef, useState } from "react";

type Fn = () => void;

const useIntersection = (
  loadMoreUsers: Fn,
  searchMoreUsers: Fn,
  searchQuery: string
) => {
  const loader = useRef(loadMoreUsers);
  useEffect(() => {
    // updating current property to get new value from C.O.V.E
    if (searchQuery.length) {
      loader.current = searchMoreUsers;
    } else {
      loader.current = loadMoreUsers;
    }
  }, [searchQuery, searchMoreUsers, loadMoreUsers]);

  const observer = useRef(
    new IntersectionObserver(
      entries => {
        // once element is fully visible (threshold: 1)
        if (entries[0].isIntersecting) {
          loader.current();
        }
      },
      { threshold: 1 }
    )
  );

  const [node, setNode] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    const currentElement = node;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [node]);

  return { setNode };
};

export default useIntersection;
