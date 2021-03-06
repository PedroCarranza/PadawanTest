import React, { useState, useEffect } from "react";
import "./Posts.css"
import ReactLoading from 'react-loading';

import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import options from "../configs/Options";
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

function Posts() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { SearchBar } = Search;

    useEffect(async () => {
        // Get all comments available
        let commentsList = []
        await fetch("https://jsonplaceholder.typicode.com/comments")
            .then(response => response.json())
            .then(json => commentsList = json);

        // Get all posts available
        let postsList = []
        await fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => postsList = json);

        // Loads all comments inside the post
        for (var i = 0; i < commentsList.length; i++) {
            postsList.find((obj, j) => {
                if (obj.id === commentsList[i].postId) {
                    let postCommentsList = postsList[j].commentsList === undefined ? [] : postsList[j].commentsList;
                    postCommentsList.push({ id: commentsList[i].id, name: commentsList[i].name, email: commentsList[i].email, body: commentsList[i].body });
                    postsList[j] = { userId: postsList[j].userId, id: postsList[j].id, title: postsList[j].title, body: postsList[j].body, commentsList: postCommentsList };
                    return true; // Stop searching
                }
            });
        }

        // Get all users available
        let usersList = [];
        await fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(json => usersList = json);

        // Loads all posts inside user
        for (var i = 0; i < postsList.length; i++) {
            usersList.find((obj, j) => {
                if (obj.id === postsList[i].userId) {
                    let userPostsList = usersList[j].postsList === undefined ? [] : usersList[j].postsList;
                    userPostsList.push({ id: postsList[i].id, title: postsList[i].title, body: postsList[i].body, commentsList: postsList[i].commentsList });
                    usersList[j] = { id: usersList[j].id, name: usersList[j].name, username: usersList[j].username, postsList: userPostsList };
                    return true; // Stop searching
                }
            })
        }

        setData(usersList);

        setLoading(false);
    }, []);

    function showDataComments(row) {
        let returnData = [];

        data.find((obj) => {
            obj.postsList.find((internalObj) => {
                if (internalObj.id === row.id) {
                    returnData = internalObj.commentsList;
                    return true;
                }
            })
        })
        return returnData;
    }

    const expandInternalRow = {
        onlyOneExpanding: true,
        renderer: row => (
            <>
                <h2>Coment??rios no post</h2>
                <ToolkitProvider
                    keyField="id"
                    data={showDataComments(row)}
                    columns={[
                        {
                            dataField: 'name',
                            text: 'Nome',
                            headerStyle: {
                                backgroundColor: 'black',
                                color: "white"
                            },
                            sort: true,
                        },
                        {
                            dataField: 'email',
                            text: 'Email',
                            headerStyle: {
                                backgroundColor: 'black',
                                color: "white"
                            },
                            sort: true,
                        },
                        {
                            dataField: 'body',
                            text: 'Texto',
                            headerStyle: {
                                backgroundColor: 'black',
                                color: "white"
                            },
                            sort: true,
                        }
                    ]}
                    search
                >
                    {props => (
                        <>
                            <SearchBar
                                {...props.searchProps}
                                style={{ color: 'black', marginLeft: '3px', width: '99.5%' }}
                                placeholder="Pesquise os coment??rios"
                                delay={250}
                            />
                            <BootstrapTable
                                {...props.baseProps}
                                bordered={true}
                                bootstrap4={true}
                                noDataIndication="N??o h?? dados"
                                condensed={true}
                                rowStyle={{ backgroundColor: 'lightgray', border: '2px solid black' }}
                            />
                        </>
                    )}
                </ToolkitProvider>
            </>
        ),
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) {
                return <b>-</b>;
            }
            return <b>...</b>;
        },
        expandColumnRenderer: ({ expanded }) => {
            if (expanded) {
                return (
                    <b>???</b>
                );
            }
            return (
                <b>???</b>
            );
        },
    };

    function showDataPosts(row) {
        let returnData = [];

        data.find((obj) => {
            if (obj.id === row.id) {
                returnData = obj.postsList;
                return true;
            }
        })
        return returnData;
    }

    const expandRow = {
        onlyOneExpanding: true,
        renderer: row => (
            <>
                <h2>Posts feitos</h2>
                <ToolkitProvider
                    className="test"
                    keyField="id"
                    data={showDataPosts(row)}
                    columns={[
                        {
                            dataField: 'title',
                            text: 'T??tulo',
                            headerStyle: {
                                backgroundColor: 'black',
                                color: "white"
                            },
                            sort: true,
                        },
                        {
                            dataField: 'body',
                            text: 'Texto',
                            headerStyle: {
                                backgroundColor: 'black',
                                color: "white"
                            },
                            sort: true,
                        }
                    ]}
                    search
                >
                    {props => (
                        <>
                            <SearchBar
                                {...props.searchProps}
                                style={{ color: 'black', marginLeft: '3px', width: '99.5%' }}
                                placeholder="Pesquise os posts"
                                delay={250}
                            />
                            <BootstrapTable
                                {...props.baseProps}
                                expandRow={expandInternalRow}
                                bordered={true}
                                bootstrap4={true}
                                noDataIndication="N??o h?? dados"
                                condensed={true}
                                rowStyle={{ backgroundColor: 'lightgray', border: '2px solid black' }}
                                pagination={paginationFactory(options)}
                            />
                        </>
                    )}
                </ToolkitProvider>
            </>
        ),
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) {
                return <b>-</b>;
            }
            return <b>...</b>;
        },
        expandColumnRenderer: ({ expanded }) => {
            if (expanded) {
                return (
                    <b>???</b>
                );
            }
            return (
                <b>???</b>
            );
        },
    };


    return (
        <>
            {loading && <ReactLoading type={"cubes"} color={"red"} height={667} width={375} />}
            {!loading &&
                <div className="posts">
                    <h2>Usu??rios</h2>
                    <ToolkitProvider
                        keyField="id"
                        data={data}
                        columns={[
                            {
                                dataField: 'name',
                                text: 'Nome',
                                headerStyle: {
                                    backgroundColor: 'black',
                                    color: "white"
                                },
                                sort: true,
                            },
                            {
                                dataField: 'username',
                                text: "Nome de usu??rio",
                                headerStyle: {
                                    backgroundColor: 'black',
                                    color: "white"
                                },
                                sort: true,
                            }
                        ]}
                        search
                    >
                        {props => (
                            <>
                                <SearchBar
                                    {...props.searchProps}
                                    style={{ color: 'black', marginLeft: '3px', width: '99.5%' }}
                                    placeholder="Pesquise os usu??rios"
                                    delay={250}
                                />
                                <BootstrapTable
                                    {...props.baseProps}
                                    expandRow={expandRow}
                                    bordered={false}
                                    bootstrap4={true}
                                    noDataIndication="N??o h?? dados"
                                    condensed={true}
                                    rowStyle={{ backgroundColor: 'lightgray', border: '2px solid black' }}
                                    pagination={paginationFactory(options)}
                                />
                            </>
                        )
                        }
                    </ToolkitProvider>

                </div>
            }
        </>
    );
}

export default Posts;