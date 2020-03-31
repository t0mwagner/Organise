import React from 'react';
import { ContentHeader } from './ContentHeader'
import { SideBar } from './SideBar'

export const Content = () => (
    <div className="content">
        <ContentHeader />
        <div id="content_main">
            <SideBar />
            <div id="task_list">
                <section className="openedTasks">
                    <ul>
                        <li>
                            <span>
                                box
                            </span>
                            <span>
                                task 1
                            </span>
                        </li>
                        <li>
                            <span>
                                box
                            </span>
                            <span>
                                task 2
                            </span>
                        </li>
                        <li>
                            <span>
                                box
                            </span>
                            <span>
                                task 3
                            </span>
                        </li>
                    </ul>
                </section>
                <section className="closedTasks">
                    <ul>
                        <li>
                            <span>
                                box
                            </span>
                            <span>
                                task 1
                            </span>
                        </li>
                        <li>
                            <span>
                                box
                            </span>
                            <span>
                                task 2
                            </span>
                        </li>
                        <li>
                            <span>
                                box
                            </span>
                            <span>
                                task 3
                            </span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
)