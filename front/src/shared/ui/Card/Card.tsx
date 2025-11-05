import {
  Children,
  isValidElement,
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext
} from 'react';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';

interface CardBodyContextProps {
  hasFooter: boolean,
  hasHeader: boolean
}

const CardContext = createContext<CardBodyContextProps>({
  hasHeader: false,
  hasFooter: false,
});


export const Card = ({ children, className, max = false }: PropsWithChildren<{ className?: string, max?: boolean}>) => {
  let hasBody = false;

  Children.forEach(children, (child) => {
    if (
      isValidElement(child) && child.type === CardBody
    ) {
      hasBody = true;
    }
  });

  const hasHeader = Children.toArray(children).some(
    (child: ReactNode) => isValidElement(child) && child.type === CardHeader
  );
  const hasFooter = Children.toArray(children).some(
    (child: ReactNode) => isValidElement(child) && child.type === CardFooter
  );

  if (!hasBody) {
    throw new Error("Card must contain a <Card.Body />");
  }
  return (
    <CardContext.Provider value={{ hasHeader, hasFooter }}>
      <div className={twMerge(classnames('rounded-2xl shadow-md shadow-gray-g2 bg-white', {'w-full': max}, className))}>
        {children}
      </div>
    </CardContext.Provider>
  )
}

const cls = {
  body: ({hasFooter, hasHeader}: CardBodyContextProps) => `px-5 ${hasHeader ? `pt-4` : 'pt-5'} ${hasFooter ? `pb-4` : 'pb-5'}`,
  header: 'p-5 border-style-b',
  footer: 'p-5 border-style-t'
}
const CardBody = ({children, className }: PropsWithChildren<{ className?: string}>) => {
  const { hasHeader, hasFooter } = useContext(CardContext);
  return <div className={twMerge(className, cls.body({hasHeader, hasFooter}))}>{ children }</div>
}

const CardHeader = ({children}: PropsWithChildren) => {
  return <div className={cls.header}>{ children }</div>
}

const CardFooter = ({children}: PropsWithChildren) => {
  return <div className={cls.footer}>{ children }</div>
}

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardBody.displayName = "CardBody";
CardFooter.displayName = "CardFooter";

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;