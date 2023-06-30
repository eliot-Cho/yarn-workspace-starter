import validate from 'validate-npm-package-name';

export const validateNpmName = (name: string) => {
    const nameValidation = validate(name);

    if (nameValidation.validForNewPackages) {
        return { valid: true };
    }

    return {
        valid: false,
        problems: [...(nameValidation.errors || []), ...(nameValidation.warnings || [])],
    };
};
