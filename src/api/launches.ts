export async function getUpcomingLaunches() {
    const res = await fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=12");
    const data = await res.json();
    return data.results;
  }
  