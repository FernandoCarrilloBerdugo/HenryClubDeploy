import styled from "styled-components";

export default function Modal({children, estado, cambiarEstado}) {
    return (
        <>
            {estado && 
                <Overlay>
                    <ContenedorModal>
                        <EncabezadoModal>
                            <p></p>
                        </EncabezadoModal>
                        <BotonCerrar onClick={() => cambiarEstado(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </BotonCerrar>
                        {children}
                    </ContenedorModal>
                </Overlay>
            }
        </>
    )
}

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top:0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    padding:40px; 
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4
`

const ContenedorModal = styled.div`
    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 20px
`

const EncabezadoModal = styled.div`
    display: flex;
    aling-items: center;
    justify-content: space-between;
    margin-top: 0px;
    margin-bottom: 5px;
    padding-top: 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E8E8E8;

`

const BotonCerrar = styled.button`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor:pointer; 
`