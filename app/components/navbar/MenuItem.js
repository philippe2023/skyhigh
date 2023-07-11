'use client'

function MenuItem(props) {
    const { item } = props;

    return (
        <div >
            <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">{item}</div>
        </div>
    );
}

export default MenuItem;