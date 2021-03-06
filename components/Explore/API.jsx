import React from 'react'
import Link from 'next/link';
import Button from '../Form/Button';

const APIComponent = ({ site, _id, by, actions, name }) => {
    return (
        <div style={{
            padding: "1em",
            border: "1px solid #EAEAEA",
            margin: '1em',
            width: 400
        }}
        >
            <h3 style={{
                textAlign: 'center',
                marginBottom: '1em'
            }}>{site} [{name}]</h3>
            {by && <div style={{ marginBottom: 10 }}>{by.username}님이 만듦</div>}
            {
                actions &&
                <div>
                    <h5>사용 가능한 액션</h5>
                    <ul>
                        {actions.map((d, i) => (
                            <li key={i}>{d.name}</li>
                        ))}
                    </ul>
                </div>
            }
            {!by && <Link href={"/visiable/" + _id}><Button filled>편집하기</Button></Link>}
        </div>
    )
}

export default APIComponent;