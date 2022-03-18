import { Button, PageHeader, Table } from "antd";
import { useEffect } from "react";
import { BookTypes } from "../types";
import Book from "./Book";
import Layout from "./Layout";
import styles from "./Layout.module.css"

interface ListProps{
    books: BookTypes[] | null;
    loading:boolean;
    //getBooks: () => void;
    //error : Error| null;
    //logout: () => void;
    goAdd: () => void;
    deleteBook: (bookId:number) =>void
}

const List:React.FC<ListProps> = ({books, loading , goAdd, deleteBook,
    //getBooks,
    //error,
    //logout,
}) => {

    // useEffect(() =>{
    //     getBooks()
    // },[getBooks])

    // useEffect(() => {
    //     if(error){
    //         logout();
    //     }
    // },[error,logout])

    const logout = () => {};


    return (
        <Layout>
            <PageHeader 
                title={<div>Book List</div>} 
                extra={[
                    <Button 
                        key="2"
                        type="primary"
                        onClick={goAdd}
                        className={styles.button}
                    >
                    Add Book
                    </Button>,
                    <Button 
                        key="1"
                        type="primary" 
                        onClick={logout}
                        className={styles.button}
                    >
                        Logout
                    </Button>]}
            />
            <Table dataSource={[books || []]}
                columns={[{
                title:"Book",
                dataIndex:"Book",
                key:"book",
                render:(text, record) => <Book author="" bookId={1} title="23" createdAt=""  url="" deleteBook={deleteBook}/>,
            },
        ]} 
            loading={books === null || loading}
            showHeader={false}
            rowKey="bookId"
            pagination={false}
            className={styles.table}
            />
        </Layout>
    )

}

export default List