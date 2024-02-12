import { useState } from "react";
import { CiBookmarkCheck } from "react-icons/ci";

import Container from "../Shared/Container";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const CategorySection = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const categories = [
    {
      title: "Students",
      useCases: [
        "Organize study schedules",
        "Manage assignment deadlines",
        "Track project progress for group assignments",
      ],
    },
    {
      title: "Developers",
      useCases: [
        "Task management for coding projects",
        "Keep track of bugs and feature requests",
        "Plan sprints and manage team tasks",
        "Plan sprints and manage team tasks",
      ],
    },
    {
      title: "Corporate Professionals",
      useCases: [
        "Schedule meetings and deadlines",
        "Manage personal and team tasks",
        "Coordinate projects across departments",
        "Manage client meetings and appointments",
        "Organize daily banking operations",
      ],
    },
    {
      title: "Bankers",
      useCases: [
        "Track financial tasks and goals",
        "Manage client meetings and appointments",
        "Organize daily banking operations",
        "Track financial tasks and goals",
        "Manage client meetings and appointments",
        "Organize daily banking operations",
      ],
    },
  ];
  return (
    <>
      <h2 className='text-black h-28 flex items-center text-center justify-center text-2xl md:text-4xl font-bold bg-gradient-to-l from-sky-300 via-white to-blue-700 mb-10'>
        Organize Daily Tasks With Us.
      </h2>
      <Container>
        <Tabs
          focusTabOnClick={false}
          selectedIndex={selectedTabIndex}
          onSelect={index => setSelectedTabIndex(index)}
        >
          <TabList className='flex flex-wrap px-2 justify-center gap-5'>
            {categories.map((category, index) => (
              <Tab
                key={index}
                className='cursor-pointer bg-white py-3 px-4 border-b border-white border-opacity-30'
                style={{
                  borderBottom:
                    index === selectedTabIndex
                      ? "2px solid #3490dc"
                      : "2px solid transparent",
                }}
              >
                <div>
                  <p className='font-bold uppercase'>{category.title}</p>
                </div>
              </Tab>
            ))}
          </TabList>

          <div className='px-2 py-10'>
            {categories.map((category, index) => (
              <TabPanel key={index}>
                <ul className='flex flex-col px-2 border border-blue-300 overflow-hidden md:p-10 my-5 text-white rounded-2xl'>
                  {category.useCases.map((useCase, idx) => (
                    <div key={idx} className='flex items-center gap-x-2'>
                      <CiBookmarkCheck className='text-2xl' />
                      <li className='text-lg md:text-xl'>{useCase}</li>
                    </div>
                  ))}
                </ul>
              </TabPanel>
            ))}
          </div>
        </Tabs>
      </Container>
    </>
  );
};

export default CategorySection;
