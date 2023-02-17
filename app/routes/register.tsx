import { ActionFunction } from '@remix-run/node';
import { Form, Outlet, useActionData } from '@remix-run/react'
import HeaderC from '~/components/Header'
import { register } from '~/repository/loginRepository';
import { createUserSession } from '~/services/sesssion.server';
import { getHeaderItems } from '~/utils/helper';
import headerItems from "../mock/headerItems"

type ActionData = {
    formError?: string;
    fieldErrors?: { username: string | undefined; password: string | undefined };
    fields?: { loginType: string; username: string; password: string };
}

export let action: ActionFunction = async ({
    request,
}): Promise<Response | ActionData | undefined> => {
    let { loginType, username, password } = Object.fromEntries(
        await request.formData()
    );

    loginType = 'register'

    if (
        typeof loginType !== "string" ||
        typeof username !== "string" ||
        typeof password !== "string"
    ) {
        return { formError: `Form not submitted correctly.` };
    }

    let fields = { loginType, username, password }
    //Check if exists
    const res = await register(username, password)
    return createUserSession(res, "/products");
};

function Register() {
    const actionData = useActionData<ActionData | undefined>();
    let items = getHeaderItems(actionData, headerItems)
    return (
        <>
            <HeaderC items={items} selectedKey='Register' />
            <Form
                method="post"
                aria-describedby={
                    actionData?.formError ? "form-error-message" : undefined
                }
            >
                <div>
                    <label htmlFor="username-input">Username</label>
                    <input
                        type="text"
                        id="username-input"
                        name="username"
                        defaultValue={actionData?.fields?.username}
                        aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                        aria-describedby={
                            actionData?.fieldErrors?.username ? "username-error" : undefined
                        }
                    />
                    {actionData?.fieldErrors?.username ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="username-error"
                        >
                            {actionData.fieldErrors.username}
                        </p>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="password-input">Password</label>
                    <input
                        id="password-input"
                        name="password"
                        defaultValue={actionData?.fields?.password}
                        type="password"
                        aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                        aria-describedby={
                            actionData?.fieldErrors?.password ? "password-error" : undefined
                        }
                    />
                    {actionData?.fieldErrors?.password ? (
                        <p
                            className="form-validation-error"
                            role="alert"
                            id="password-error"
                        >
                            {actionData.fieldErrors.password}
                        </p>
                    ) : null}
                </div>
                <div id="form-error-message">
                {actionData?.formError ? (
                    <p className="form-validation-error" role="alert">
                        {actionData.formError}
                    </p>
                ) : null}
            </div>
            <button type="submit" className="button">
                Submit
            </button>
            </Form>


            <Outlet />
        </>
    )
}

export default Register