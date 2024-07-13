// components/Sidebar.js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { Home, ShoppingCart, Inventory, LocalShipping, Campaign, BarChart, Payment, Build, LocalOffer, People, Palette, Extension, KeyboardArrowDown, Wallet} from '@mui/icons-material';

const menuItems = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Orders', icon: ShoppingCart, path: '/orders' },
  { name: 'Products', icon: Inventory, path: '/products' },
  { name: 'Delivery', icon: LocalShipping, path: '/delivery' },
  { name: 'Marketing', icon: Campaign, path: '/marketing' },
  { name: 'Analytics', icon: BarChart, path: '/analytics' },
  { name: 'Payments', icon: Payment, path: '/payments' },
  { name: 'Tools', icon: Build, path: '/tools' },
  { name: 'Discounts', icon: LocalOffer, path: '/discounts' },
  { name: 'Audience', icon: People, path: '/audience' },
  { name: 'Appearance', icon: Palette, path: '/appearance' },
  { name: 'Plugins', icon: Extension, path: '/plugins' },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="bg-[#1E2640] text-white w-56 flex flex-col h-screen">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <Avatar src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-base font-semibold">Nishyan</span>
        </div>
        <KeyboardArrowDown className="text-sm" />
      </div>
      <nav className="flex-grow" style={{ height: '66.67%' }}>
        <List className="p-0">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.path;
            return (
              <Link href={item.path} key={item.name}>
                <ListItem 
                  button 
                  className={`
                    py-1 px-3
                    hover:bg-[#353C53] 
                    transition-colors 
                    duration-200
                    ${isActive ? 'bg-[#353C53]' : ''}
                  `}
                >
                  <ListItemIcon className="min-w-0 mr-3">
                    <item.icon className={`text-white text-lg ${isActive ? 'opacity-100' : 'opacity-70'}`} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    className={`${isActive ? 'font-medium' : 'font-normal'}`}
                    primaryTypographyProps={{ className: 'text-sm' }}
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </nav>
      <div className="bg-[#353C53] p-3 m-3 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-[#494F64] p-1.5 rounded-md">
            <Wallet className="text-white text-md" />
          </div>
          <div>
            <p className="text-xs font-medium">Available credits</p>
            <p className="text-sm font-bold">222.10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;