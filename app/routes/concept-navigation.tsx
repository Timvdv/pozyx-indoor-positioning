import { ClientOnly, useHydrated } from "remix-utils";
import { ConceptNavigation } from "~/components/conceptNavigation";
import usePozyx from "~/hooks/usePozyx";

export default function Index() {
  const hydrated = useHydrated();
  const posState = usePozyx();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {hydrated && (
        <ClientOnly fallback={<p>Loading...</p>}>
          {() => <ConceptNavigation posState={posState} />}
        </ClientOnly>
      )}
    </div>
  );
}
