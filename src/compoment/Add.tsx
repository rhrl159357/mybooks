import { ForkOutlined } from "@ant-design/icons"
import { Button, Input, InputRef, PageHeader } from "antd"
import TextArea from "antd/lib/input/TextArea"
import Layout from "./Layout"
import styles from "./Add.module.css"
import {useRef} from "react";
import TextAreaType from "rc-textarea"

interface AddProps{
    loding : boolean;
    back : () => void;
    logout : () => void;
}

const Add: React.FC<AddProps> = ({loding, back, logout}) => {

    const titleRef= useRef<Input>(null);
    const messageRef= useRef<TextAreaType>(null);
    const authorRef= useRef<Input>(null);
    const urlRef= useRef<Input>(null);

    return <Layout>
        <PageHeader onBack={back} 
        title={<div><ForkOutlined /> Add Book</div>}
        subTitle= "Add your Book"
        extra={[
            <Button key="1"
            type="primary"
            onClick={logout}
            className={styles.button_logout}
            >
                Logout
            </Button>
        ]}
        />
        <div className={styles.add}>
            <div className={styles.input_title}>
                Title
                <span className={styles.required}> * </span>
            </div>
            <div className={styles.input_area}><Input placeholder="Title" className={styles.input} ref={titleRef}/> </div>
            <div className={styles.input_comment}>
                Comment
                <span className={styles.required}> * </span>
            </div>
            <div className={styles.input_area}>
                <TextArea 
                rows={4}
                placeholder="Comment"
                className={styles.input}
                ref={messageRef}
                /> 
            </div>
            <div className={styles.input_author}>
                Author
                <span className={styles.required}> * </span>
            </div>
            <div>
            <Input placeholder="Author" className={styles.input} ref={authorRef}/> 
            </div>
            <div className={styles.input_url}>
                URL
                <span className={styles.required}> * </span>
            </div>
            <div className={styles.input_area}>
            <Input placeholder="URL" className={styles.input} ref={urlRef} /> 
            </div>
            <div className={styles.button_area}>
                <Button 
                size = "large"
                loading={loding}
                onClick={click}
                className={styles.button}
                >Add</Button>
            </div>
        </div>
    </Layout>
    function click() {
        const title = titleRef.current!.state.value;
    }
}

export default Add