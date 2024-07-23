import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

//1399/11/19

function useFormControl(iRules: any): any {
  const [t] = useTranslation();
  const [values, setValuesState] = useState<any>();
  const [validationErrors, setValidationErrors] = useState<any>();
  const [rules, setRules] = useState<any>(iRules);
  useEffect(() => {
    const val: any = { ...values };
    for (const rule in rules) {
      if (rules[rule].find((x: any) => x.initialValue !== undefined))
        val[rule] = computingValue(
          rules[rule],
          rules[rule].find((x: any) => x.initialValue !== undefined)
            .initialValue,
        );
      else {
        if (
          rules[rule].find((x: any) => x.isNumber == true) ||
          rules[rule].find((x: any) => x.isFloat == true) ||
          rules[rule].find((x: any) => x.isPrice == true)
        )
          val[rule] = computingValue(rules[rule], 0);
        else if (rules[rule].find((x: any) => x.isArray == true))
          val[rule] = [];
        else val[rule] = computingValue(rules[rule], "");
      }
    }
    setValuesState(val);
  }, []);

  function resetForm(items?: any) {
    let val: any = { ...values };
    if (items) {
      for (const rule in rules) {
        if (items.find((x: any) => x[rule] != undefined))
          val[rule] = computingValue(
            rules[rule],
            items.find((x: any) => x[rule] != undefined)[rule],
          );
        else if (rules[rule].find((x: any) => x.initialValue != undefined))
          val[rule] = computingValue(
            rules[rule],
            rules[rule].find((x: any) => x.initialValue != undefined)
              .initialValue,
          );
        else {
          if (
            rules[rule].find((x: any) => x.isNumber == true) ||
            rules[rule].find((x: any) => x.isFloat == true) ||
            rules[rule].find((x: any) => x.isPrice == true)
          )
            val[rule] = computingValue(rules[rule], 0);
          else if (rules[rule].find((x: any) => x.isArray == true))
            val[rule] = [];
          else val[rule] = computingValue(rules[rule], "");
        }
      }
      setValuesState(val);
    } else {
      for (const rule in rules) {
        if (rules[rule].find((x: any) => x.initialValue != undefined))
          val[rule] = computingValue(
            rules[rule],
            rules[rule].find((x: any) => x.initialValue != undefined)
              .initialValue,
          );
        else {
          if (
            rules[rule].find((x: any) => x.isNumber == true) ||
            rules[rule].find((x: any) => x.isFloat == true) ||
            rules[rule].find((x: any) => x.isPrice == true)
          )
            val[rule] = computingValue(rules[rule], 0);
          else if (rules[rule].find((x: any) => x.isArray == true))
            val[rule] = [];
          else val[rule] = computingValue(rules[rule], "");
        }
      }
      setValuesState(val);
    }
    setValidationErrors("");
  }

  function setInitialValues(initialValues: any) {
    if (initialValues) {
      let val: any = { ...values };
      for (const rule in rules) {
        let fieldName = rules[rule].find((x: any) => x.fieldName != undefined)
          ? rules[rule].find((x: any) => x.fieldName != undefined).fieldName
          : rule;
        if (
          initialValues[fieldName] ||
          initialValues[fieldName] == "" ||
          initialValues[fieldName] == 0
        ) {
          const itemValid = validation({
            name: rule,
            value: initialValues[fieldName],
          });
          if (itemValid.isValid)
            val[rule] = computingValue(rules[rule], initialValues[fieldName]);
          else if (rules[rule].find((x: any) => x.initialValue != undefined))
            val[rule] = computingValue(
              rules[rule],
              rules[rule].find((x: any) => x.initialValue != undefined)
                .initialValue,
            );
        } else if (rules[rule].find((x: any) => x.initialValue != undefined))
          val[rule] = computingValue(
            rules[rule],
            rules[rule].find((x: any) => x.initialValue != undefined)
              .initialValue,
          );
      }
      setValuesState(val);
    }
  }

  function onFormSubmit() {
    let errors: any = { ...validationErrors };
    let formIsValid = true;
    for (const item in rules) {
      const itemValid = validation({ name: item, value: values[item] });
      if (!itemValid.isValid) {
        errors[item] = { msg: itemValid.msg };
        formIsValid = false;
      } else delete errors[item];
    }
    setValidationErrors(errors);
    return formIsValid;
  }

  function onChangeHandler(event: any) {
    const val: any = { ...values };
    val[event.target.name] = computingValue(
      rules[event.target.name],
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value,
    );
    setValuesState(val);
    let errors: any = { ...validationErrors };
    const itemValid = validation(event.target);
    if (!itemValid.isValid) errors[event.target.name] = { msg: itemValid.msg };
    else delete errors[event.target.name];
    setValidationErrors(errors);
  }

  function setValue(name: string, value: any) {
    const val: any = { ...values };
    val[name] = computingValue(rules[name], value);
    setValuesState(val);
    let errors: any = { ...validationErrors };
    const itemValid = validation({ name: name, value: value });
    if (!itemValid.isValid) errors[name] = { msg: itemValid.msg };
    else delete errors[name];
    setValidationErrors(errors);
  }

  function setValues(items: any) {
    const val: any = { ...values };
    let errors: any = { ...validationErrors };
    items.map((item: any) => {
      for (const rule in rules) {
        if (item[rule] || item[rule] == 0 || item[rule] == "") {
          val[rule] = computingValue(rules[rule], item[rule]);
          const itemValid = validation({ name: rule, value: item[rule] });
          if (!itemValid.isValid) errors[rule] = { msg: itemValid.msg };
          else delete errors[rule];
        }
      }
    });
    setValuesState(val);
    setValidationErrors(errors);
  }

  function computingValue(rules: any, value: any): any {
    if (rules) {
      if (rules.find((x: any) => x.maxLength != undefined))
        value = String(value).substring(
          0,
          rules.find((x: any) => x.maxLength != undefined).maxLength,
        );
      if (rules.find((x: any) => x.isNumber == true))
        return hasValue(value) != "" ? parseInt(value) : 0;
      else if (rules.find((x: any) => x.isFloat == true))
        return hasValue(value) ? String(value).replace(/[^0-9.]/g, "") : 0;
      else if (rules.find((x: any) => x.isPrice == true))
        return hasValue(value) != ""
          ? parseInt(String(value).replace(/,/g, ""))
          : 0;
      else if (rules.find((x: any) => x.isStringNumber == true))
        return String(value).replace(/\D/g, "");
      else return value;
    } else return value;
  }

  function hasValue(value: any) {
    return value || value == "" || value == 0;
  }

  function GetValue(itemName: string): any {
    if (values && hasValue(values[itemName])) {
      if (rules[itemName].find((x: any) => x.isPrice == true))
        return values[itemName].toLocaleString();
      else return values[itemName];
    } else return "";
  }

  function GetError(item: any) {
    if (validationErrors && validationErrors[item.name])
      return (
        <div className="text-danger mt-2 mx-3" style={{ fontSize: "12px" }}>
          <span className="mdi mdi-18px mdi-alert-rhombus-outline mx-1" />
          {validationErrors[item.name].msg}
        </div>
      );
    else return "";
  }

  function GetRequired(item: any) {
    if (rules[item.name].find((x: any) => x.required == true))
      return <span className="text-danger mr-1">*</span>;
    else return "";
  }

  function validation(item: any): { isValid: boolean; msg: string } {
    let isValid = true;
    let msg = "";
    item.value = computingValue(rules[item.name], item.value);
    if (rules[item.name]) {
      rules[item.name].map((rule: any) => {
        //Check Required
        if (rule.required) {
          isValid =
            (item.value || item.value == 0) && item.value !== "" ? true : false;
          if (!isValid) msg = rule.msg ? rule.msg : t("mustFillError");
        }
        if ((item.value || item.value == 0) && item.value !== "") {
          //Check Min Length Value
          if (isValid && rule.minLength) {
            isValid = String(item.value).length >= rule.minLength;
            if (!isValid)
              msg = rule.msg ? rule.msg : t("minLengthError") + rule.minLength;
          }
          //Check Max Length Value
          if (isValid && rule.maxLength) {
            isValid = String(item.value).length <= rule.maxLength;
            if (!isValid)
              msg = rule.msg ? rule.msg : t("maxLengthError") + rule.maxLength;
          }
          //Check Email
          if (isValid && rule.emailValidate) {
            const emailRegex =
              /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            isValid = emailRegex.test(item.value);
            if (!isValid) msg = rule.msg ? rule.msg : t("emailValidateError");
          }
          //Check Is StringNumber
          if (isValid && rule.isStringNumber) {
            const numberRegex = /^\d+$/;
            isValid = numberRegex.test(item.value);
            if (!isValid)
              msg = rule.msg ? rule.msg : t("stringNumberValidateError");
          }
          //Check Is Number
          if (isValid && rule.isNumber) {
            const numberRegex = /^\d+$/;
            isValid = numberRegex.test(item.value);
            if (!isValid) msg = rule.msg ? rule.msg : t("numberValidateError");
          }
          //Check Min Value
          if (isValid && rule.min) {
            isValid =
              parseInt(
                rule.isPrice ? item.value.replace(/,/g, "") : item.value,
              ) >= Number(rule.min);
            if (!isValid)
              msg = rule.msg ? rule.msg : t("minValueError") + rule.min;
          }
          //Check Max Value
          if (isValid && rule.max) {
            isValid =
              parseInt(
                rule.isPrice ? item.value.replace(/,/g, "") : item.value,
              ) <= Number(rule.max);
            if (!isValid)
              msg = rule.msg ? rule.msg : t("maxValueError") + rule.max;
          }
          //Check Is Mobile
          if (isValid && rule.isMobile) {
            const mobileRegex = /^09\d+/;
            isValid = mobileRegex.test(item.value);
            if (!isValid) msg = rule.msg ? rule.msg : t("mobileValidateError");
          }
          //Check Is Time
          if (isValid && rule.isTime) {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            const bigTimeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
            isValid =
              timeRegex.test(item.value) || bigTimeRegex.test(item.value);
            if (!isValid) msg = rule.msg ? rule.msg : t("timeValidateError");
          }
          //Check Is Float Number
          if (isValid && rule.isFloat) {
            const floatRegex = /^[+-]?([0-9]*[.])?[0-9]+/;
            isValid = floatRegex.test(item.value);
            if (!isValid) msg = rule.msg ? rule.msg : t("numberValidateError");
          }
          //Check Is URL
          if (isValid && rule.isUrl) {
            const urlRegex = /^(http|https):\/\//;
            isValid = urlRegex.test(item.value);
            if (!isValid) msg = rule.msg ? rule.msg : t("urlValidateError");
          }
          //Check Is IP
          if (isValid && rule.isIP) {
            const ipRegex =
              /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;
            isValid = ipRegex.test(item.value);
            if (!isValid) msg = rule.msg ? rule.msg : t("ipInvalid");
          }
          //Check Is National Code
          if (isValid && rule.isNationalCode) {
            isValid = isValidIranianNationalCode(item.value);
            if (!isValid)
              msg = rule.msg ? rule.msg : t("nationalCodeValidateError");
          }
        }
      });
    }
    return { isValid: isValid, msg: msg };
  }

  function isValidIranianNationalCode(input: string) {
    if (!/^\d{10}$/.test(input)) return false;

    var check = parseInt(input[9]);
    var sum = 0;
    var i;
    for (i = 0; i < 9; ++i) sum += parseInt(input[i]) * (10 - i);
    sum %= 11;
    return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
  }

  return {
    values,
    onChangeHandler,
    onFormSubmit,
    GetError,
    GetRequired,
    GetValue,
    setInitialValues,
    resetForm,
    setValue,
    setValues,
  };
}

export default useFormControl;
