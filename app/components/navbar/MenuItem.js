'use client'

function MenuItem(props) {
    const { item } = props;

    return (
        <div >
            <div className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-slate-800 transition font-semibold">{item}</div>
        </div>
    );
}

export default MenuItem;