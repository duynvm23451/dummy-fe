import axios from "axios";

export const login = async (formData) => {
  const reponse = await axios.post(
    import.meta.env.VITE_API + "login",
    formData
  );
  return reponse.data;
};

export const signup = async (formData) => {
  const response = await axios.post(
    import.meta.env.VITE_API + "register",
    formData
  );
  return response.data;
};

export const getLoggedInUser = async (params) => {
  const response = await axios.get(import.meta.env.VITE_API + "user", {
    headers: {
      Authorization: "Bearer " + params.token,
    },
  });
  return response.data;
};

export const listRegistedCourses = async (params) => {
  const response = await axios.get(
    import.meta.env.VITE_API + "listRegistedCourses",
    {
      headers: {
        Authorization: "Bearer " + params.token,
      },
    }
  );
  return response.data;
};

export const listUnregisterdCourses = async (params) => {
  const response = await axios.get(
    import.meta.env.VITE_API + "listUnregisterdCourses",
    {
      headers: {
        Authorization: "Bearer " + params.token,
      },
    }
  );
  return response.data;
};

export const getCourseDetail = async (params) => {
  const response = await axios.get(
    import.meta.env.VITE_API + "courses/" + params.id,
    {
      headers: {
        Authorization: "Bearer " + params.token,
      },
    }
  );
  return response.data;
};

export const getLessonDetail = async (params) => {
  const response = await axios.get(
    import.meta.env.VITE_API + "lessons/" + params.id,
    {
      headers: {
        Authorization: "Bearer " + params.token,
      },
    }
  );
  return response.data;
};

export const addFavoriteLesson = async (token, id) => {
  const response = await axios.put(
    import.meta.env.VITE_API + "studentLessons/favorite",
    {
      lesson_id: id,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const createStudentLessons = async (params) => {
  const response = await axios.put(
    import.meta.env.VITE_API + "studentLessons",
    formData,
    {
      headers: {
        Authorization: "Bearer " + formData.token,
      },
    }
  );
  return response.data;
};

export const listFavoritedLessons = async (queryParams) => {
  const response = await axios.get(
    import.meta.env.VITE_API + "listFavoritedLessons",
    {
      headers: {
        Authorization: "Bearer " + queryParams.token,
      },
    }
  );
  return response.data;
};

export const listTests = async (queryParams) => {
  const response = await axios.get(import.meta.env.VITE_API + "tests", {
    params: queryParams,
    headers: {
      Authorization: "Bearer " + queryParams.token,
    },
  });
  return response.data;
};

export const getTestDetail = async (queryParams) => {
  const response = await axios.get(
    import.meta.env.VITE_API + "tests/" + queryParams.id,
    {
      headers: {
        Authorization: "Bearer " + queryParams.token,
      },
    }
  );
  return response.data;
};

export const submitTest = async (data, token) => {
  const response = await axios.post(
    import.meta.env.VITE_API + "submitTest",
    data,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const testResults = async (params) => {
  const response = await axios.get(import.meta.env.VITE_API + "testResults", {
    headers: {
      Authorization: "Bearer " + params.token,
    },
  });
  return response.data;
};

export const createNote = async (data) => {
  const response = await axios.post(
    import.meta.env.VITE_API + "lessons/" + data.lesson_id + "/notes",
    data,
    {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    }
  );
  return response.data;
};

export const listNotes = async (token) => {
  const response = await axios.get(import.meta.env.VITE_API + "notes", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const deleteNote = async (token, id) => {
  const response = await axios.delete(
    import.meta.env.VITE_API + "notes/" + id,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const enrollment = async (formData) => {
  const response = await axios.post(
    import.meta.env.VITE_API + "enrollCourse",
    formData,
    {
      headers: {
        Authorization: "Bearer " + formData.token,
      },
    }
  );
  return response.data;
};
