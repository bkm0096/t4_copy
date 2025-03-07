import {useEffect, useState} from "react";


const initState:PageResponse<TodoDTO> = {
    dtoList: [],
    total:0,
    size: 0,
    end : 0,
    next: false,
    prev: false,
    page: 0,
    start: 0
}

import useCustomParam from "../../hooks/useCustomParam.tsx";
import {getTodoList} from "../../api/todoApi.tsx";
import PageComponent from "../common/pageComponent.tsx";
import LoadingComponent from "../common/loadingComponent.tsx";



function ListComponent() {

    const {page, size, refresh, loading, setLoading, moveRead, movePage} = useCustomParam()
    const [serverData, setServerData] = useState<PageResponse<TodoDTO>>(initState)

    useEffect( () => {

        setLoading(true)
        getTodoList(page, size).then(data => {
            setServerData(data)
            setLoading(false)
        })

    }, [page, size, refresh])




    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">

            <LoadingComponent isLoading={loading}/>
            <div className="flex flex-wrap mx-auto justify-center p-6">
                List Component
            </div>

            <div>
                <ul className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-2">

                    {serverData.dtoList.map(todo =>
                        <li
                            onClick={() => {moveRead(todo.tno)}}
                            key={todo.tno}>
                            {todo.tno} - {todo.title}
                        </li>
                    )}
                </ul>
            </div>

            <PageComponent serverData={serverData} moveListPage={movePage}/>

        </div>
    );
}

export default ListComponent;