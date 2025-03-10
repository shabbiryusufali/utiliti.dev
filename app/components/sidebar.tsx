import { useLocation } from "react-router";
import { Link } from "react-router";
import { sidebar } from "~/utilities";

export default function Sidebar() {
  const location = useLocation();

  return (
    <ul>
      {sidebar.map((it) => (
        <li key={it.name} className="relative mt-6 focus:outline-hidden">
          <h2 className="text-xs font-semibold text-white">{it.name}</h2>
          <div className="relative mt-3 pl-2">
            <div className="absolute inset-y-0 left-2 w-px bg-white/5"></div>
            <ul className="border-l border-transparent">
              {it.children.map((c) => {
                const current = location.pathname.includes(c.url);
                return (
                  <li key={c.name} className="relative">
                    {current && (
                      <div className="absolute h-6 w-px bg-orange-500 -left-px"></div>
                    )}

                    <Link
                      to={c.url}
                      className={
                        "flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 hover:text-white" +
                        (current ? " text-white" : " text-zinc-400")
                      }
                      viewTransition={true}
                    >
                      <span className="truncate">{c.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
