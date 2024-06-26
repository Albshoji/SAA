import { TextInput, Group, Button, FileButton, Text, Center, Anchor, Modal } from "@mantine/core"
import { useParams, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useState } from "react";
import { modals } from "@mantine/modals";

function EditBlogPost() {
    const [file, setFile] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);
    const {id} = useParams();

    let navigate = useNavigate(); 

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
    });

    function handleDeleteClicked() {
        modals.openConfirmModal({
            title: 'Cancelar escrita',
            centered: true,
            children: (
                <Text>
                    Tem certeza que quer cancelar a escrita da postagem? Essa ação é irreversível.
                </Text>
            ),
            labels: {confirm: 'Cancelar', cancel: 'Continuar escrevendo'},
            confirmProps: {color: 'red'},
            cancelProps: {variant: 'filled'},
            onConfirm: () => navigate("/blog")
        })
    }

    return (
        <>
            <Group m="md" justify="space-between">
                <TextInput 
                    placeholder="Título"
                    w={{base: "100%", sm: 460}}
                    maxLength={128}
                />
                <div>
                    <Anchor href="/blog/1"><Button mr="md" bg='aprai-purple.5' radius="lg" fz="xl">Salvar</Button></Anchor>
                    
                    <Button bg='red' radius="lg" fz="xl" onClick={handleDeleteClicked}>Cancelar</Button>
                </div>
            </Group>

            <RichTextEditor editor={editor} m="md" mih={600}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
            </RichTextEditor>

            <Center>
                <FileButton onChange={setFile} accept="image/png,image/jpeg">
                    {(props) => <Button bg='aprai-purple.5' radius="lg" fz="xl" {...props}>Carregar Imagem</Button>}
                </FileButton>
            </Center>
            {file && (
                <Text size="sm" ta="center" mt="sm">
                Arquivo selecionado: {file.name}
                </Text>
            )}
        </>
    )
}

export default EditBlogPost