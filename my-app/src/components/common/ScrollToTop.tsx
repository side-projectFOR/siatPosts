// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

// interface ScrollButtonProps {
//   show: boolean;
// }

// const ScrollButton = styled.button<ScrollButtonProps>`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   width: 45px;
//   height: 45px;
//   border-radius: 50%;
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   opacity: ${({ show }) => (show ? 1 : 0)};
//   visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
//   transition: all 0.3s ease;
//   box-shadow: ${({ theme }) => theme.shadows.md};
//   z-index: 90;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.secondary};
//     transform: translateY(-3px);
//   }

//   svg {
//     width: 20px;
//     height: 20px;
//   }
// `;

// const ScrollToTop: React.FC = () => {
//   const [showButton, setShowButton] = useState(false);

//   useEffect(() => {
//     const checkScrollHeight = () => {
//       if (!showButton && window.pageYOffset > 400) {
//         setShowButton(true);
//       } else if (showButton && window.pageYOffset <= 400) {
//         setShowButton(false);
//       }
//     };

//     window.addEventListener('scroll', checkScrollHeight);
//     return () => {
//       window.removeEventListener('scroll', checkScrollHeight);
//     };
//   }, [showButton]);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   return (
//     <ScrollButton show={showButton} onClick={scrollToTop} aria-label="맨 위로 스크롤">
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="18 15 12 9 6 15"></polyline>
//       </svg>
//     </ScrollButton>
//   );
// };

// export default ScrollToTop;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ScrollButtonProps {
  show: boolean;
}

const ScrollButton = styled.button<ScrollButtonProps>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 90;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-3px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ScrollToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (!showButton && window.pageYOffset > 400) {
        setShowButton(true);
      } else if (showButton && window.pageYOffset <= 400) {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', checkScrollHeight);
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ScrollButton show={showButton} onClick={scrollToTop} aria-label="맨 위로 스크롤">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </ScrollButton>
  );
};

export default ScrollToTop;
