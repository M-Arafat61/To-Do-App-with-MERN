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
      ],
    },
    {
      title: "Corporate Professionals",
      useCases: [
        "Schedule meetings and deadlines",
        "Manage personal and team tasks",
        "Coordinate projects across departments",
      ],
    },
    {
      title: "Bankers",
      useCases: [
        "Track financial tasks and goals",
        "Manage client meetings and appointments",
        "Organize daily banking operations",
      ],
    },
  ];

  //   const handleTabSelect = index => {
  //     setSelectedTabIndex(index === selectedTabIndex ? null : index);
  //   };

  return (
    <>
      <h2 className='text-black h-20 flex items-center text-center justify-center text-2xl md:text-3xl font-bold bg-gradient-to-l from-sky-400 via-white to-blue-500 mb-10 md:mb-24'>
        Organize Daily Tasks With Us.
      </h2>
      <Container>
        <Tabs
          selectedIndex={selectedTabIndex}
          onSelect={index => setSelectedTabIndex(index)}
        >
          <TabList className='flex justify-center gap-5 flex-wrap'>
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={`${
                  index === selectedTabIndex && "after:w-[100%] overflow-hidden"
                } cursor-pointer capitalize xl:text-2xl font-semibold relative after:w-8 after:h-[2px] after:bg-blue-500 after:absolute after:-bottom-1 after:left-0`}
              >
                <div className='bg-gradient-to-l from-sky-400 via-blue-700 to-teal-500'>
                  <p className='cursor-pointer text-sm md:text-xl font-bold uppercase px-2 py-1 md:px-6 md:py-3'>
                    {category.title}
                  </p>
                </div>
              </Tab>
            ))}
          </TabList>

          {categories.map((category, index) => (
            <TabPanel key={index}>
              <ul className='flex flex-col px-2 py-5  border border-blue-400 md:p-10 my-5 text-white'>
                {category.useCases.map((useCase, idx) => (
                  <div key={idx} className='flex items-center gap-x-2'>
                    <CiBookmarkCheck className='text-2xl' />
                    <li className='text-lg md:text-xl'>{useCase}</li>
                  </div>
                ))}
              </ul>
            </TabPanel>
          ))}
        </Tabs>
      </Container>
    </>
  );
};

export default CategorySection;
