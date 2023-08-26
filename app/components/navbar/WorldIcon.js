'use client'
import { TbWorld } from 'react-icons/tb';
import ThemeChanger from './ThemeChanger';

const WorldIcon = () => {
    return (
        <>
        <div onClick={()=>window.my_modal_2.showModal()} className="btn bg-white border-none dropdown dropdown-end hidden md:block text-lg font-bold py-3 px-4 rounded-full hover:bg-slate-800 dark:hover:bg-white hover:text-gray-50 dark:hover:text-black transition curser-pointer dark:bg-gray-900 dark:text-gray-300">
            <TbWorld/>
        </div>
        <dialog id="my_modal_2" className="modal">
            <form method="dialog" className="modal-box">
                <div className="tabs">
                    <div className="tab tab-bordered tab-active">Customize</div> 
                    <div className="tab tab-bordered">Currency</div> 
                    <div className="tab tab-bordered">Language and region</div> 
                </div>
                <ThemeChanger />
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        </>
    )
}

export default WorldIcon;