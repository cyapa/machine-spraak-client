import React from "react";
import BootstrapButton from "react-bootstrap/Button";

type ButtonVariants = Readonly<"primary" | "secondary" >;

type Props =  Readonly<{
    displayName:string;
    variant:ButtonVariants;
    isLoading?:boolean;
    onClickAction: ()=>Promise<void>;
}>;

const Button = ({displayName,variant,isLoading,onClickAction}:Props) =>(
    <BootstrapButton disabled={isLoading} variant={variant} onClick={async ()=>await onClickAction()}>
        {isLoading?'...':displayName}
    </BootstrapButton>
);

export default Button;