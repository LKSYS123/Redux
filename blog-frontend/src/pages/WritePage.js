import React, { useEffect, useState } from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import axios from 'axios';

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer />
            <WriteActionButtonsContainer />
        </Responsive>
    );
};

export default WritePage;