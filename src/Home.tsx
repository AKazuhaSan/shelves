import { Button, Flex, FloatButton, Input, Modal, Select, Image } from 'antd'
import './App.css'
import { useState, lazy, Suspense } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import FetchByISBN from './API/GoogleBook'


const ScanISBNComponent = lazy(() => import('./API/ScanISBN'));

function Home() {

    type BookItem = {
        volumeInfo: {
            title: string,
            authors: string,
            imageLinks: {
                thumbnail: string
            }
        }
    }

    const [ScanISBNStatus, SetScanISBNStatus] = useState(false)

    const [Items, SetItems] = useState<BookItem[]>([])

    const [SearchModal, SetSearchModal] = useState([false, false])
    const [SearchISBN, SetSearchISBN] = useState("")

    const SearchOnClick = async () => {
        SetItems(await FetchByISBN(SearchISBN))

    }

    const toggleModal = (idx: number, target: boolean) => {
        SetSearchModal((p) => {
            p[idx] = target;
            return [...p]
        })
    }

    const SearchBefore = (
        <Select defaultValue="ISBN">
            <Select.Option key="Name" value="Name">Name</Select.Option>
            <Select.Option key="ISBN" value="ISBN">ISBN</Select.Option>
        </Select>)

    return (
        <>
            <FloatButton key="SearchButton" icon={<img src='/search.svg' alt='icon' style={{ width: '100%', height: '100%' }} onClick={() => { toggleModal(1, true) }}></img>}></FloatButton>
            <>
                <Modal
                    key="SearchDialog"
                    title="Search"
                    open={SearchModal[1]}
                    onOk={() => { toggleModal(1, false) }}
                    onCancel={() => { toggleModal(1, false) }}
                    footer={[
                        <Button key="Scaning" onClick={() => { SetScanISBNStatus(true) }}>Scan</Button>,
                        <Button key="Search" icon={<SearchOutlined />} onClick={SearchOnClick}>
                            Search
                        </Button>,
                        <Button key="submit" type='primary'>Finish</Button>,

                    ]}
                >
                    <>
                        <p style={{ margin: '1px', fontSize: 'x-small' }}>ISBN usually found under the barcode.</p>
                        <Input key="SearchInput" addonBefore={SearchBefore} placeholder='Type here' required onChange={(e) => { SetSearchISBN(e.target.value) }}></Input>

                        <div key={"Preview"}>
                            {Items.map((item, _index) => (
                                <Flex vertical>
                                    <Flex align='' style={{ marginTop: '8px' }}>
                                        <Image src={item.volumeInfo.imageLinks.thumbnail} />

                                        <Flex vertical style={{ marginLeft: '10px' }}>
                                            <h2 style={{ margin: '0px' }}>{item.volumeInfo.title}</h2>
                                            <h4 style={{ margin: "0px" }}>by {item.volumeInfo.authors}</h4>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            ))}
                            {
                                        ScanISBNStatus && <Suspense fallback={<div>Loading...</div>}>
                                            <ScanISBNComponent></ScanISBNComponent>
                                        </Suspense>
                                    }
                        </div>
                    </>
                </Modal>
                
            </>
        </>
    )
}

export default Home
