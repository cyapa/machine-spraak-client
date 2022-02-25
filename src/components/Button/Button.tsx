import React from "react";
import BootstrapButton from "react-bootstrap/Button";

type ButtonVariants = Readonly<"primary" | "secondary" >;

type Props =  Readonly<{
    displayName:string;
    variant:ButtonVariants;
    onClickAction: ()=>Promise<void>;
}>;

const Button = ({displayName,variant,onClickAction}:Props) =>(
    <BootstrapButton variant={variant} onClick={async ()=>await onClickAction()}>
        {displayName}
    </BootstrapButton>
);

export default Button;