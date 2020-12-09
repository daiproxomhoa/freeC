/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import React from "react";

const Content = ({ data, next }) => {
  const [answers, setAnswer] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    data?.answers && setAnswer(Array(data.answers.length).fill(""));
    setError(false);
  }, [data.answers]);

  const style = error ? { border: "2px solid  red" } : {};
  if (data.type === "iframe") {
    return (
      <Card style={{ ...style, padding: "8px 16px" }}>
        <CardHeader title={data.title || data.label}></CardHeader>
        <CardContent>
          {data.src && (
            <iframe
              title="copy"
              width="900px"
              height="500px"
              src={data.src}
              scrolling="no"
              allowFullScreen={true}
              mozallowfullscreen={"true"}
              webkitallowfullscreen={"true"}
            />
          )}
        </CardContent>
      </Card>
    );
  }
  if (data.type === "radio") {
    return (
      <Card style={{ ...style, padding: "8px 16px", maxWidth: 800 }}>
        <CardHeader title={data.title || data.label}></CardHeader>
        <CardContent>
          <FormControl required component="fieldset">
            <FormGroup>
              {data?.questions?.map((v) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={answers.includes(v)}
                      onChange={() => {
                        if (data?.answers?.length === 1) {
                          setAnswer([v]);
                        } else {
                          setAnswer((one) =>
                            one.includes(v)
                              ? [...one, v]
                              : one.filter((one) => one.id !== v.id)
                          );
                        }
                      }}
                      name={v.title}
                    />
                  }
                  label={v.title}
                />
              ))}
            </FormGroup>
          </FormControl>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!answers.length}
            onClick={() => {
              console.log(answers, data.answers);
              if (
                answers.filter((v, index) => v.id === data.answers[index])
                  .length === data.answers.length
              ) {
                next();
              } else {
                setError(true);
              }
            }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
  if (data.type === "space") {
    return (
      <Card style={{ ...style, padding: "8px 16px", maxWidth: 800 }}>
        <CardHeader title={data.title || data.label}></CardHeader>
        {data.src && (
          <img
            src={data.src}
            alt=""
            style={{ height: 400, objectFit: "contain" }}
          />
        )}
        <p>
          {data.questions.map((v, index) => {
            if (typeof v !== "string") {
              return (
                <input
                  key={index}
                  style={{
                    margin: "0px 8px",
                    height: 28,
                    border: "unset",
                    borderBottom: "1px dashed grey",
                  }}
                  type="text"
                  value={answers[v.index]}
                  onChange={(e) =>
                    setAnswer((one) =>
                      one.map((x, idx) => {
                        if (v.index === idx) {
                          return e.target.value;
                        } else {
                          return x;
                        }
                      })
                    )
                  }
                />
              );
            } else {
              return (
                <span key={index}>
                  {v.replace("/n", "")}
                  {v.includes("/n") && <br />}
                </span>
              );
            }
          })}
        </p>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!answers.length}
            onClick={() => {
              console.log(answers, data.answers);
              if (
                answers.filter((v) => data.answers.includes(v)).length ===
                data.answers.length
              ) {
                next();
              } else {
                setError(true);
              }
            }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
  if (data.type === "blank") {
    return (
      <Card style={{ ...style, padding: "8px 16px", maxWidth: 800 }}>
        <CardHeader title={data.title || data.label}></CardHeader>
        <div style={{ position: "relative" }}>
          {data.src && (
            <img
              src={data.src}
              alt=""
              style={{ width: 700, objectFit: "contain" }}
            />
          )}
          {data.answers.map((v, index) => (
            <input
              key={index}
              style={{
                margin: "0px 8px",
                position: "absolute",
                height: 28,
                width: 50,
                ...data.position[index],
              }}
              type="text"
              value={answers[v]}
              onChange={(e) =>
                setAnswer((one) =>
                  one.map((x, idx) => {
                    if (index === idx) {
                      return e.target.value;
                    } else {
                      return x;
                    }
                  })
                )
              }
            />
          ))}
        </div>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!answers.length}
            onClick={() => {
              console.log(answers, data.answers);
              if (
                answers.filter((v, index) => v === data.answers[index])
                  .length === data.answers.length
              ) {
                next();
              } else {
                setError(true);
              }
            }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
  if (data.type === "video") {
    return (
      <Card style={{ ...style, padding: "8px 16px", maxWidth: 800 }}>
        <CardHeader title={data.title || data.label}></CardHeader>
        <CardContent>{data.src}</CardContent>
      </Card>
    );
  }
  return null;
};

export default Content;
