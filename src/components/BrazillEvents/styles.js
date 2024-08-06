import styled from "styled-components";

export const Evento = styled.div`
    border: 0.0625rem solid rgb(219, 219, 219);
    border-radius: 0.25rem;
    background: #fff;
    column-gap: 10px;
`

export const HorarioEvento = styled.div`
    border-right: 0.0625rem solid rgb(219, 219, 219);
    padding: 1.5rem 0;
    display: flex;
    justify-content: center;
    height: 100%;
    p {
        display: flex;
        align-items: center;
    }
`
export const Competidores = styled.div`
    display: block;
    padding: 1rem 0;
`

export const Background = styled.div`
    border-top: 0.0625rem solid rgb(219, 219, 219);
`

export const NomeEsporte = styled.p`
    color: rgb(48, 51, 54);
    font-size: 20px;
    font-weight: 800;
`

export const DiaEvento = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgb(255, 255, 255);
    height: 3.5rem;
    background: linear-gradient(270deg, rgb(0, 156, 224) 27.86%, rgb(2, 35, 102) 103.89%);
    padding: 0px 1rem;
    p {
    font-family: 'Paris', 'Inter';
        font-size: 1.5rem;
        font-weight: 900;
        letter-spacing: .1rem;
    }
`