import React from 'react'
import TimePicker from './'


const NapTimePickerPage: React.FC<any> = (props: any) => {

    return (
        <div style={{ position: "relative" }}>
            <TimePicker
                withSecond={true}
                type='24' />
        </div>
    )
}

export default NapTimePickerPage