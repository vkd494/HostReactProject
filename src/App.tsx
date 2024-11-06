import { useCallback, useState } from 'react'
import * as stylex from '@stylexjs/stylex';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import ProjectName from './componets/ProjectName'
import CodeMirror from '@uiw/react-codemirror';
import { languages } from '@codemirror/language-data';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import TextAreaInput from './componets/TextAreaInput';
import MantisIdDropDown from './componets/MantisIdDropDown';

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({})
  const [selectedProjectId, setSelectedProjectId] = useState("")
  const [selectedMatisId, setSelectedMatisId] = useState("")
  const [reason, setReason] = useState("")

  const onChange = useCallback((val: string) => {
    setQuery(val);
  }, []);


  const executeQuery = () => {
    if (!selectedProjectId || !selectedMatisId || !reason || !query) {
      let message = ""
      if (!selectedProjectId) {
        message = 'Please select the Project'
      } else if (!selectedMatisId) {
        message = 'Please select the Mantis Id'
      } else if (!reason.trim()) {
        message = 'Please enter the Reason'
      } else {
        message = 'Please ennter the Query'
      }
      alert(message)
      return
    }

    console.log({
      mantisId: selectedMatisId,
      reason: reason,
      runQuery: query
    })
    fetch('http://172.16.40.130:8080/api/mantis-integration/postMantisIntegration', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mantisId: selectedMatisId,
        reason: reason,
        runQuery: query
      })
    }).then((res) => res.text()).then((response) => setResult({ response }))
  }
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.inputContainer)}>
        <ProjectName onSelect={setSelectedProjectId} value={selectedProjectId} />
        {!!selectedProjectId &&
          <>
            <MantisIdDropDown projectId={selectedProjectId} value={selectedMatisId} onSelect={setSelectedMatisId} />
            <TextAreaInput label='Reason' onChangeText={setReason} value={reason} />
          </>
        }

      </div>
      <div {...stylex.props(styles.main)}>
        <div {...stylex.props(styles.queryContainer)} >
          <CodeMirror style={{ marginTop: '10px' }} value={query} height="40vh" extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]} onChange={onChange} />
          <div {...stylex.props(styles.runbtnContainer)}>
            <button type="button" {...stylex.props(styles.clearBtn)} onClick={() => { setQuery(""); setResult({}) }} >Clear</button>
            <button type="button" {...stylex.props(styles.runBtn)} onClick={executeQuery}>Run Query</button>
          </div>
        </div>
        <div {...stylex.props(styles.resultContainer)}>
          <p>Result : </p>
          <JsonView data={result} shouldExpandNode={allExpanded} style={defaultStyles} />

        </div>
      </div>
    </div>
  )
}

export default App

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    height: '100vh',
    background: '#fff'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  main: {
    width: '75%',
    height: '100vh',
    background: '#f5f5f5',
  },
  queryContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  clearBtn: {
    backgroundColor: '#fff',
    color: '#3e450f',
    width: '150px',
    marginRight: '10px',
    borderRadius: ' 2px',
    fontSize: '16px',
    fontWeight: '600',
    border: '1px solid #3e450f'
  },
  runBtn: {
    backgroundColor: '#3e450f',
    color: '#fff',
    width: '160px',
    borderRadius: ' 2px',
    fontSize: '16px',
    fontWeight: '600',
    border: "1px solid transparent"
  },
  runbtnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '16px'
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    padding: '16px'
  },
  result: {
    overflowY: 'scroll'
  }

})
