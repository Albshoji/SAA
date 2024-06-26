import {ActionIcon, Button, Center, FocusTrap, Group} from "@mantine/core";
import ProtectedComponent from "./ProtectedComponent.jsx";
import {IconPencil} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {useState} from "react";

function EditableText({text, onSave, containerStyle, inputStyle, textClassName, maxLen}){
    const [editText, setEditText] = useState("");
    const [editing, {open, close}] = useDisclosure();

    function beginEditing(){
        setEditText(text);
        open();
    }

    function save(){
        onSave(editText);
        close();
    }

    //If not editing, just the text and the edit button.
    if (!editing){
        return (
            <div style={containerStyle}>
                <ProtectedComponent>
                    <ActionIcon onClick={beginEditing} pos="absolute">
                        <IconPencil/>
                    </ActionIcon>
                </ProtectedComponent>
                <Center>
                    <p className={textClassName}>
                        {text}
                    </p>
                </Center>
            </div>
        );
    }

    const maxLenProp = maxLen ? {maxLength: maxLen} : {};
    //If editing, the text area and the confirm/cancel buttons.
    return (
        <div style={containerStyle}>
            <FocusTrap active={true}>
                <textarea
                    value={editText}
                    onChange={(event) => setEditText(event.currentTarget.value)}
                    style={{
                        resize: "none",
                        background: "none",
                        width: "100%",
                        height: "100%",
                        ...inputStyle
                    }}
                    {...maxLenProp}
                    className={textClassName}
                />
                {/*<Textarea*/}
                {/*    value={editText}*/}
                {/*    onChange={(event) => setEditText(event.currentTarget.value)}*/}
                {/*    classNames={{root: textClassName}}*/}
                {/*    variant="unstyled"*/}
                {/*/>*/}
            </FocusTrap>

            <ProtectedComponent>
                <Group pos={"absolute"}>
                    <Button onClick={save}>Salvar</Button>
                    <Button bg="red" onClick={close}>Cancelar</Button>
                </Group>
            </ProtectedComponent>
        </div>
    )
}

export default EditableText;