import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, User } from '../types';
import { mockProjects, mockUsers } from '../data/mockData';

interface AppContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  projects: Project[];
  activeProject: Project | null;
  setActiveProjectId: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(mockProjects[0] || null);

  const login = (email: string) => {
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const setActiveProjectId = (id: string) => {
    const project = mockProjects.find(p => p.id === id);
    if (project) {
      setActiveProject(project);
    }
  };

  return (
    <AppContext.Provider value={{ user, login, logout, projects: mockProjects, activeProject, setActiveProjectId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
