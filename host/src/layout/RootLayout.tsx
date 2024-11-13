import CachedTab from "../components/CachedTab.tsx";
import {CachedRouteProvider} from "../context/keepaliveContext.tsx";
import CachedOutlet from "./CachedOutlet.tsx";
import {DashboardSidebarSubNavigation, Navigation} from "../components/Sidebar.tsx";

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'user',
    title: 'user',
  },
  {
    segment: 'order',
    title: 'order',
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    children: [
      {
        segment: 'sales',
        title: 'Sales',
      },
      {
        segment: 'traffic',
        title: 'Traffic',
      },
    ],
  },
  {
    segment: 'masterData',
    title: 'masterData',
  },
];
function RootLayout() {
  return (
    <CachedRouteProvider>
      <header style={{height: '80px', background: '#c6c6c6'}}>
        header
        <CachedTab/>
      </header>
      <div style={{display: "flex"}}>
        <div style={{width: '300px'}}>
          <DashboardSidebarSubNavigation subNavigation={NAVIGATION} onLinkClick={() => {
          }} selectedItemId={''}/>
        </div>
        <div style={{flex: 1}}>
          <CachedOutlet/>
        </div>
      </div>
    </CachedRouteProvider>
  )
}

export default RootLayout
