import React, { useState, useEffect } from "react";
import "./Todos.css"
import ReactLoading from 'react-loading';

import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import options from "../configs/Options";
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

function Todos() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { SearchBar } = Search;

    useEffect(async () => {
        // Get all todos available
        let todosList = []
        await fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => response.json())
            .then(json => todosList = json);

        // Get all users available
        let usersList = [];
        await fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(json => usersList = json);

        // Loads all todos inside user
        for (var i = 0; i < todosList.length; i++) {
            usersList.find((obj, j) => {
                if (obj.id === todosList[i].userId) {
                    let userTodosList = usersList[j].todosList === undefined ? [] : usersList[j].todosList;
                    userTodosList.push({ id: todosList[i].id, title: todosList[i].title, completed: todosList[i].completed });
                    usersList[j] = { id: usersList[j].id, name: usersList[j].name, username: usersList[j].username, todosList: userTodosList };
                    return true; // Stop searching
                }
            })
        }

        setData(usersList);

        setLoading(false);
    }, []);

    function checkFormatter(cell, row) {
        if (row.completed === "true" || row.completed === true) {
            return (
                <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/heavy-check-mark_2714.png"} style={{ maxWidth: "5%" }} />
            );
        }
        return (
            <img src={"https://uc-emoji.azureedge.net/orig/c1/d9d88630432cf61ad335df98ce37d6.png"} style={{ maxWidth: "5%" }} />
        );
    }

    function showDataTodos(row) {
        let returnData = [];

        data.find((obj) => {
            if (obj.id === row.id) {
                returnData = obj.todosList;
                return true;
            }
        })
        return returnData;
    }

    const innerRowStyle = (row, rowIndex) => {
        const style = {};
        if (row.completed === "true" || row.completed === true) {
            style.backgroundColor = "#c6ffb3";
        } else {
            style.backgroundColor = "#ffb3b3";
        }

        return style;
    }

    const expandRow = {
        onlyOneExpanding: true,
        renderer: row => (
            <>
                <h2>TO-DOs</h2>
                <ToolkitProvider
                    keyField="id"
                    data={showDataTodos(row)}
                    columns={[
                        {
                            dataField: 'title',
                            text: 'Título',
                            headerStyle: {
                                backgroundColor: 'black',
                                color: "white"
                            },
                            sort: true,
                        },
                        {
                            dataField: 'completed',
                            text: 'Realizado',
                            headerStyle: {
                                backgroundColor: 'black',
                                color: "white"
                            },
                            sort: true,
                            formatter: checkFormatter,
                            searchable: false,
                        }
                    ]}
                    search
                >
                    {props => (
                        <>
                            <SearchBar
                                {...props.searchProps}
                                style={{ color: 'black', marginLeft: '3px', width: '99.5%' }}
                                placeholder="Pesquise os TO-DOs"
                                delay={250}
                            />
                            <BootstrapTable
                                {...props.baseProps}
                                bordered={true}
                                bootstrap4={true}
                                noDataIndication="Não há dados"
                                condensed={true}
                                rowStyle={innerRowStyle}
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
                    <b>▲</b>
                );
            }
            return (
                <b>▼</b>
            );
        },
    };

    return (
        <>
            {loading && <ReactLoading type={"cubes"} color={"red"} height={667} width={375} />}
            {!loading && <div className="todos">
                <h2>Usuários</h2>
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
                            text: "Nome de usuário",
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
                                placeholder="Pesquise os usuários"
                                delay={250}
                            />
                            <BootstrapTable
                                {...props.baseProps}
                                expandRow={expandRow}
                                bordered={false}
                                bootstrap4={true}
                                noDataIndication="Não há dados"
                                condensed={true}
                                rowStyle={{ backgroundColor: '#ffffcc', border: '2px solid black' }}
                                pagination={paginationFactory(options)}
                            />
                        </>
                    )}
                </ToolkitProvider>
            </div>
            }
        </>
    );
}

export default Todos;