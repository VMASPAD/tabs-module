"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const LOCAL_STORAGE_KEY = "tab-system-data";

export default function Test() {
  const [tabs, setTabs] = useState([
    { id: "tab1", label: "Tab 1", content: "Content 1" },
    { id: "tab2", label: "Tab 2", content: "Content 2" },
  ]);
  const [activeTab, setActiveTab] = useState("tab1");

  // Load tabs and activeTab from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setTabs(parsedData.tabs || []);
      setActiveTab(parsedData.activeTab || "tab1");
    }
  }, []);

  // Save tabs and activeTab to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ tabs, activeTab })
    );
  }, [tabs, activeTab]);

  const addTab = () => {
    const newTab = {
      id: `tab${tabs.length + 1}`,
      label: `Tab ${tabs.length + 1}`,
      content: `Content ${tabs.length + 1}`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (tabId: string) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));
    if (activeTab === tabId && tabs.length > 1) {
      const newActive = tabs.find((tab) => tab.id !== tabId)?.id || "";
      setActiveTab(newActive);
    }
  };

  const moveTab = (dragIndex: number, hoverIndex: number) => {
    const updatedTabs = [...tabs];
    const [movedTab] = updatedTabs.splice(dragIndex, 1);
    updatedTabs.splice(hoverIndex, 0, movedTab);
    setTabs(updatedTabs);
  };

  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList onAddTab={addTab} view="style1">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              view="style1"
              onClose={() => closeTab(tab.id)}
              moveTab={moveTab}
              index={index}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      
    </DndProvider></>
  );
}
